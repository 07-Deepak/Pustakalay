const firebaseConfig = {
  apiKey: "AIzaSyCeBYkpFwsq9_IHDsoRyAZgbNyb78-oTgs",
  authDomain: "pustakalay-auth.firebaseapp.com",
  databaseURL: "https://pustakalay-auth-default-rtdb.firebaseio.com",
  projectId: "pustakalay-auth",
  storageBucket: "pustakalay-auth.appspot.com",
  messagingSenderId: "911918208081",
  appId: "1:911918208081:web:6f24aea08ee2850424d470",
  measurementId: "G-HQF862LDF3"
    }
  
    const app = firebase.initializeApp(firebaseConfig);
  
    const storage = firebase.storage();
  
    const inp = document.querySelector(".inp");
    const progressbar = document.querySelector(".progress");
    const img = document.querySelector(".img");

    const fileData = document.querySelector(".filedata");
    const loading = document.querySelector(".loading");
    const fileIcon = document.querySelector(".fileIcon");
    let file;
    let fileName;
    let progress;
    let isLoading = false;
    let uploadedFileName;
    const selectImage = () => {
      inp.click();
    };
    const getImageData = (e) => {
      file = e.target.files[0];
      fileName = Math.round(Math.random() * 9999) + file.name;
      if (fileName) {
        fileData.style.display = "block";
      }
      fileData.innerHTML = fileName;
      console.log(file, fileName);
    };
  
    const uploadImage = () => {
        loading.style.display = "block";
        const storageRef = storage.ref().child("myimages");
        const folderRef = storageRef.child(fileName);
        const uploadtask = folderRef.put(file);
        
        uploadtask.on(
          "state_changed",
          (snapshot) => {
            console.log("Snapshot", snapshot.ref.name);
            progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progress = Math.round(progress);
            progressbar.style.width = progress + "%";
            progressbar.innerHTML = progress + "%";
            uploadedFileName = snapshot.ref.name;
          },
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("myimages")
              .child(uploadedFileName)
              .getDownloadURL()
              .then((url) => {
                console.log("URL", url);
                loading.style.display = "none"; // Hide the loading indicator
                fileData.innerHTML = "File Uploaded Successfully"; // Update the fileData to indicate success
                
                // Remove the image element
                img.style.display = "none";
                
                // You may want to add a success message or perform other actions here
              })
              .catch((error) => {
                console.error("Error getting download URL:", error);
              });
          }
        );
      };
      