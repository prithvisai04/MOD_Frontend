import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

const httpOptions1 = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};
@Injectable({
  providedIn: "root"
})
export class AuthService {

  token:string;
  
  private loggedIn = false;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorizaton": this.token
    })
  };

  constructor(private http: HttpClient) {}


  // Get All - API

  public getAllRegistered() {
    return this.http.get("https://localhost:44307/api/getAllRegistered");
  }

  public getAllSkills() {
    return this.http.get("http://localhost:12345/Technology/GetAllTechnology");
  }

  public getAllTraining() {
    return this.http.get("https://localhost:44307/api/getAllTraining");
  }
  
  public getAllPayment() {
    return this.http.get("https://localhost:44307/api/getAllPayment");
  }


  // Get All By ID - API

  public getUserById(id) {
    return this.http.get("https://localhost:44307/api/getUserById/" + id);
  }

  public getSkillById(id) {
    return this.http.get("https://localhost:44307/api/getSkillById/" + id);
  }

  public getTrainingById(id) {
    return this.http.get("https://localhost:44307/api/getTrainingById/" + id);
  }

  public getPaymentById(id)
  {
    return this.http.get("https://localhost:44307/api/getPaymentById/" + id);
  }

  // Get Search Data - API
 
  public getSearchData(data) {
    return this.http.get(
      "https://localhost:44307/api/getSearchData?trainerTechnology=" + data
    );
  }

 // Post Data In Db - API

  public saveUser(regData) {
    return this.http
      .post("http://localhost:12345/User/PostUser", regData, httpOptions1)
      .pipe(map(data1 => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public saveMentor(regData) {
    console.log(regData+"this is inside mentor post")
    return this.http
      .post("http://localhost:12345/Mentor/MentorPost", regData, httpOptions1)
      .pipe(map(data1 => (data1 = JSON.parse(JSON.stringify(data1)))));
  }
 
  public saveSkill(tech) {
    console.log(tech);
    return this.http
      .post("https://localhost:44307/app/saveSkill", tech, httpOptions1)
      .pipe(map(data1 => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public saveTraining(data) {
    return this.http
      .post("https://localhost:44307/api/saveTraining", data, httpOptions1)
      .pipe(map(data1 => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public savePayment(data) {
    console.log(data);
    return this.http
      .post("https://localhost:44307/api/savePayment", data, httpOptions1)
      .pipe(map(data1 => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public login(email, password) {
    let data =
    {
      email:email,
      password :password
    }
    return this.http
      .post(
        "https://localhost:44307/api/login",data,
        httpOptions1
      )
      .pipe(map(data1 => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  // Put Data By Id - API
  
  public updatePaymentAndCommisionById(id,model) {
    console.log("in update")
    return this.http
      .put("https://localhost:44307/api/updatePaymentAndCommisionById/" + id, model, httpOptions1)
      .pipe(map(data1 => (data1 = JSON.parse(JSON.stringify(data1)))));
  }
  
  public updateUserProfileById(id,model)
  {
    console.log("in update")
    return this.http
      .put("https://localhost:44307/api/updateUserProfileById/" + id, model, httpOptions1)
      .pipe(map(data1 => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public updateTrainerProfileById(id,model)
  {
  console.log("in update")
  return this.http
    .put("https://localhost:44307/api/updateTrainerProfileById/" + id, model, httpOptions1)
    .pipe(map(data1 => (data1 = JSON.parse(JSON.stringify(data1)))));
}

  public updateTrainingAndPaymentStatusById(id) {
    return this.http
      .put(
        "https://localhost:44307/api/updateTrainingAndPaymentStatusById/" + id,
        httpOptions1
      )
      .pipe(map(data1 => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public updateTrainingStatusById(id) {
    return this.http
      .put("https://localhost:44307/api/updateTrainingStatusById/" + id, httpOptions1)
      .pipe(map(data1 => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public updateTrainingProgress(id,progressValue) {
    return this.http
      .put("https://localhost:44307/api/updateTrainingProgressById?id=" + id + "&progressValue=" + progressValue,  httpOptions1)
      .pipe(map(data1 => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public updateTrainingRatings(id,rating) {
    return this.http
      .put("https://localhost:44307/api/updateTrainingRatingById?id=" + id + "&rating=" + rating,  httpOptions1)
      .pipe(map(data1 => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public blockById(id) {
    return this.http
      .put("https://localhost:44307/api/blockById/" + id, httpOptions1)
      .pipe(map(data1 => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public unBlockById(id) {
    return this.http
      .put("https://localhost:44307/api/unBlockById/" + id, httpOptions1)
      .pipe(map(data1 => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public acceptTrainingRequestById(id) {
    return this.http
      .put("https://localhost:44307/api/acceptTrainingRequestById/" + id, httpOptions1)
      .pipe(map(data1 => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public rejectTrainingRequestById(id) {
    return this.http
      .put("https://localhost:44307/api/rejectTrainingRequestById/" + id, httpOptions1)
      .pipe(map(data1 => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  // Delete Data By Id - API 

  public DeleteSkillById(id) {
    return this.http
      .delete("https://localhost:44307/api/DeleteSkillById/" + id, httpOptions1)
      .pipe(map(data1 => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  // Store User Data For Session Purpose
  
  storeUserData(token, email, role) {
    this.token = token;
    localStorage.setItem("id_token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("email",email);
  }

  isLoggedIn() {
    if (localStorage.getItem("id_token")) {
      return (this.loggedIn = true);
    }
  }
  
  logout() {
    this.token = null;
    localStorage.clear();
    this.loggedIn = false;
  }

 
}
