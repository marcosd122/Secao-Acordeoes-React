function ekUpload(){
    function Init() {
  
      console.log("Upload Iniciado");
  
      var fileSelect    = document.getElementById('file-upload'),
          fileDrag      = document.getElementById('file-drag'),
          submitButton  = document.getElementById('submit-button');
  
      fileSelect.addEventListener('change', fileSelectHandler, false);
  
      // XHR2 Este é um pacote npm que implementa a especificação W3C XMLHttpRequest sobre as APIs node.js.

      //https://snyk.io/advisor/npm-package/xhr2/example

      
      var xhr = new XMLHttpRequest();
      if (xhr.upload) {
        // Soltar arquivo
        fileDrag.addEventListener('dragover', fileDragHover, false);
        fileDrag.addEventListener('dragleave', fileDragHover, false);
        fileDrag.addEventListener('drop', fileSelectHandler, false);
      }
    }
  
    function fileDragHover(e) {
      var fileDrag = document.getElementById('file-drag');
  
      e.stopPropagation();
      e.preventDefault();
  
      fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
    }
  
    function fileSelectHandler(e) {
      // Buscar objeto da lista de arquivos
      var files = e.target.files || e.dataTransfer.files;
  
      // Cancelar evento e retornar ao estilo padrão
      fileDragHover(e);
  
      // Processar todos os objetos de arquivo
      for (var i = 0, f; f = files[i]; i++) {
        parseFile(f);
        uploadFile(f);
      }
    }
  
    // Saída
    function output(msg) {
      // Resposta
      var m = document.getElementById('messages');
      m.innerHTML = msg;
    }
  
    function parseFile(file) {
  
      console.log(file.name);
      output(
        '<strong>' + encodeURI(file.name) + '</strong>'
      );
      
  
      var imageName = file.name;
  
      var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
      if (isGood) {
        document.getElementById('start').classList.add("hidden");
        document.getElementById('response').classList.remove("hidden");
        document.getElementById('notimage').classList.add("hidden");
        // Thumbnail Previa
        document.getElementById('file-image').classList.remove("hidden");
        document.getElementById('file-image').src = URL.createObjectURL(file);
      }
      else {
        document.getElementById('file-image').classList.add("hidden");
        document.getElementById('notimage').classList.remove("hidden");
        document.getElementById('start').classList.remove("hidden");
        document.getElementById('response').classList.add("hidden");
        document.getElementById("file-upload-form").reset();
      }
    }
  
    function setProgressMaxValue(e) {
      var pBar = document.getElementById('file-progress');
  
      if (e.lengthComputable) {
        pBar.max = e.total;
      }
    }
  
    function updateFileProgress(e) {
      var pBar = document.getElementById('file-progress');
  
      if (e.lengthComputable) {
        pBar.value = e.loaded;
      }
    }
  
    function uploadFile(file) {
  
      var xhr = new XMLHttpRequest(),
        fileInput = document.getElementById('class-roster-file'),
        pBar = document.getElementById('file-progress'),
        fileSizeLimit = 1024; // Tamanho em MB
      if (xhr.upload) {
        // Verifique se o arquivo é menor que "x" MB
        if (file.size <= fileSizeLimit * 1024 * 1024) {
          // Barra de progresso
          pBar.style.display = 'inline';
          xhr.upload.addEventListener('loadstart', setProgressMaxValue, false);
          xhr.upload.addEventListener('progress', updateFileProgress, false);
  
          // Arquivo recebido/falha
          xhr.onreadystatechange = function(e) {
            if (xhr.readyState == 4) {             
              
            }
          };
  
          // Inicia upload
          xhr.open('POST', document.getElementById('file-upload-form').action, true);
          xhr.setRequestHeader('X-File-Name', file.name);
          xhr.setRequestHeader('X-File-Size', file.size);
          xhr.setRequestHeader('Content-Type', 'multipart/form-data');
          xhr.send(file);
        } else {
          output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
        }
      }
    }
  
    // Verifique os vários suportes de API de arquivo
    if (window.File && window.FileList && window.FileReader) {
      Init();
    } else {
      document.getElementById('file-drag').style.display = 'none';
    }
  }
  ekUpload();