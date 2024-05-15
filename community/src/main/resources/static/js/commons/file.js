function filetoBase64(file){
	console.log(file);
	
	var reader = new FileReader();
	if (file) {
      reader.readAsDataURL(file);
    }
	reader.onload = () => {
		console.dir(reader.result);
	};
	reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}