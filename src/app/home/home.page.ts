import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource} from '@capacitor/camera';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  capturedImage: any;
  fileName: any;
  uploadImage:any;
   
  constructor(
    public http: HttpClient
  ) { }


  public async addNewToGallery() { debugger

    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 10
    });
    const imagedata = 'data:image/jpeg;base64,' + capturedPhoto.base64String;
    console.log(imagedata);
    const blobImage = this.dataURItoBlob(imagedata);
    this.uploadImage = blobImage;
    console.log(this.uploadImage);

  }

   upload() { debugger
    const additionalParameter = { 
      IsCipher: "0",
      ApplicationId: "1010",
      PkSystemUploadDocSetting: 1,
    };

    const formObj = new FormData();//method
    formObj.append('file',this.uploadImage,'image.jpg');
    formObj.append('PkSystemUploadDocSetting', JSON.stringify(additionalParameter));

    // Upload the resized image to the server
    // this.http
    //   .post("https://serverengg.oceansofttech.net/api/Zion/UPLOAD", formObj)
    //   .subscribe((res: any) => { debugger
    //     // Handle the response here, e.g., display a success message or update data.
    //     alert("File uploaded successfully");
    //     const jsonString = res._body;
    //     console.log(res._body);

    //   });
 
    this.http.post("https://serverengg.oceansofttech.net/api/Zion/UPLOAD", formObj)
  .subscribe(
    (res: any) => {
      alert("File uploaded successfully");
      // Handle the response here
      const responseBody = res.body; // Access response body properly
      console.log(responseBody);
    }
  );

    }
   
  dataURItoBlob(dataURI: string) {//blob it will be used in convert to url(string)
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
    
  }
  
}


