      var editor = new MediumEditor('.editable', {
          buttonLabels: 'fontawesome'
      });

      var editor1 = new MediumEditor('.editable1', {
            disableReturn: true,
      });

      $(function () {
          $('.editable').mediumInsert({
              editor: editor,
              addons: {
                  images: {
                      fileUploadOptions: {
                          url: 'upload.php'
                      }
                  }
              }
          });


      });