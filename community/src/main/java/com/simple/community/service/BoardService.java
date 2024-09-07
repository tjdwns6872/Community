package com.simple.community.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.io.FileNotFoundException;

import org.mybatis.spring.MyBatisSystemException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.simple.community.commons.AjaxResult;
import com.simple.community.commons.FileUtil;
import com.simple.community.commons.PagingInfo;
import com.simple.community.entity.BoardDto;
import com.simple.community.mapper.BoardFileMapper;
import com.simple.community.mapper.BoardMapper;
import com.simple.community.mapper.BoardViewMapper;
import com.simple.community.mapper.ReplyMapper;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class BoardService {

	@Autowired
	private BoardMapper boardMapper;
	
	@Autowired
	private FileUtil fileUtil;
	
	@Autowired
	private ReplyMapper replyMapper;
	
	@Autowired
	private BoardFileMapper boardFileMapper;

	@Autowired
	private BoardViewMapper boardViewMapper;

	private AjaxResult ajaxResult = new AjaxResult();
	
	public Map<String, Object> boardList(Map<String, Object> params){
		Map<String, Object> result = new HashMap<>();
		try{
			Map<String, Object> data = new HashMap<>();
			Integer cnt = boardMapper.boardListCnt(params);
			PagingInfo pagination = new PagingInfo(Integer.parseInt(params.get("page").toString()));
			pagination.setTotalRecordCount(cnt);
			
			params.put("firstRecordIndex", pagination.getFirstRecordIndex());
			params.put("lastRecordIndex", pagination.getLastRecordIndex());
			log.info("\n\n{}\n\n", params.toString());

			List<BoardDto> boardList = boardMapper.boardList(params);
			if(boardList.size() > 0){
				ajaxResult.createSuccess(data);
			}else{
				throw new MyBatisSystemException(null);
			}
			data.put("cnt", cnt);
			data.put("boardList", boardList);
			data.put("paging", pagination);
		}catch(MyBatisSystemException e){
			ajaxResult.createError("불러올 데이터가 없습니다.");
		}catch(Exception e){
			ajaxResult.createFail(e);
		}finally{
			result.put("result", ajaxResult.getResult());
		}
		return result;
	}
	
	@Transactional
	public Map<String, Object> boardReg(Map<String, Object> params, HttpSession session) {
		log.info("\n\n\n{}", params.toString());
		Map<String, Object> result = new HashMap<>();
		try{
			params.put("userNo", session.getAttribute("user_no"));
			int cnt = 0;
			int cnt1 = 1;
			cnt = boardMapper.boardInsert(params);
			if(params.containsKey("uploadFile")) {			
				String base64File = params.get("uploadFile").toString();
				String fileName = params.get("fileName").toString();
				
				int fileNo = fileUtil.fileChange(base64File, fileName, 1);
				params.put("fileNo", fileNo);
				cnt1 = boardFileMapper.boardFileInsert(params);
				if(cnt1 < 1){
					throw new FileNotFoundException();
				}
			}
			if(cnt > 0 && cnt1 > 0){
				ajaxResult.createSuccess(params.get("boardNo"));
			}else{
				throw new MyBatisSystemException(null);
			}
			
		}catch(MyBatisSystemException e){
			ajaxResult.createError("게시물 등록에 실패했습니다.");
		}catch(FileNotFoundException e){
			ajaxResult.createError("첨부파일 등록에 실패했습니다.");
		}catch(Exception e){
			ajaxResult.createFail(e);
		}finally{
			result.put("result", ajaxResult.getResult());
		}
		return result;		
	}
	
	public Map<String, Object> boardDetiles(Map<String, Object> params, HttpSession session) {
		Map<String, Object> result = new HashMap<>();
		try{
			Map<String, Object> data = new HashMap<>();
			Integer userNo = (Integer) session.getAttribute("user_no");
			if(userNo != null){
				params.put("userNo", userNo);
				Integer cnt = boardViewMapper.viewUserCheck(params);
				if(cnt == null || cnt == 0){
					boardViewMapper.boardViewInsert(params);
				}
			}
			BoardDto dto = boardMapper.boardDetiles(params);
			if(dto.getBoardNo() != null){
				data.put("data", dto);
				data.put("reply", replyMapper.replyList(params));
				ajaxResult.createSuccess(data);
			}else{
				throw new MyBatisSystemException(null);
			}
		}catch(MyBatisSystemException e){
			log.error("{}", e);
			ajaxResult.createError("불러올 정보가 없습니다.");
		}catch(Exception e){
			log.error("{}", e);
			ajaxResult.createFail(e);
		}finally{
			result.put("result", ajaxResult.getResult());
		}
		return result;
	}
	
	@Transactional
	public Map<String, Object> boardDelete(Map<String, Object> params, HttpSession session) {
		params.put("userNo", session.getAttribute("user_no"));
		Map<String, Object> result = new HashMap<>();
		try{
			//파일 삭제 코드도 추가해야됨
			int check = boardMapper.boardDelete(params);
			if(check > 0){
				ajaxResult.createSuccessWithNoContent();
			}else{
				throw new MyBatisSystemException(null);
			}
		}catch(MyBatisSystemException e){
			ajaxResult.createError("삭제할 수 없는 게시물입니다.");
		}catch(Exception e){
			ajaxResult.createFail(e);
		}finally{
			result.put("result", ajaxResult.getResult());
		}
		return result;
	}
	
	@Transactional
	public Map<String, Object> boardUpdate(Map<String, Object> params, HttpSession session) {
		Map<String, Object> result = new HashMap<>();
		try{
			params.put("userNo", session.getAttribute("user_no"));
			int cnt1 = 1;
			if(params.containsKey("uploadFile")) {			
				String base64File = params.get("uploadFile").toString();
				String fileName = params.get("fileName").toString();
				
				int fileNo = fileUtil.fileChange(base64File, fileName, 1);
				params.put("fileNo", fileNo);
				cnt1 = boardFileMapper.boardFileInsert(params);
			}
			int cnt = boardMapper.boardUpdate(params);
			if(cnt > 0 && cnt1 > 0){
				ajaxResult.createSuccessWithNoContent();
			}else{
				throw new MyBatisSystemException(null);
			}
		}catch(MyBatisSystemException e){
			ajaxResult.createError("");
		}catch(Exception e){
			ajaxResult.createFail(e);
		}finally{
			result.put("result", ajaxResult.getResult());
		}
		return result;
	}
	
	public void boardFileDelete(Map<String, Object> params) {
		boardFileMapper.boardFileDelete(params);
	}
}




