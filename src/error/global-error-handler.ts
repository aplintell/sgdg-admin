import { ErrorHandler, Injectable} from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor() { }
  
  handleError(error) {
    if(error.status == 403){
      alert("forbidden");
    }else if(error.status == 404){
      alert("not found");
    }else if(error.status == 500){
      alert("server error");
    }else if(error.status == 400){
      alert("request format is incorrect");
    }else{
      console.log(error);
      alert("unexpected error");
    }
  }
  
}