import {Modal, Page, NavParams, ViewController} from 'ionic-angular';  
import {BirthdayService} from '../services/birthday.service';
import {NgZone} from '@angular/core';

@Page({
  templateUrl: 'build/pages/page2/page2.html' 
})
export class Page2 {
	public birthday;  

	constructor(private viewCtrl: ViewController,
		private navParams: NavParams,
		private birthdayService: BirthdayService) { }

  onSubmit(formData) {
    console.log('Form submission is ', formData);
    this.birthday = { "Month": formData.month, "Time": formData.time };
 

    this.birthdayService.add(this.birthday)
			.catch(console.error.bind(console));
  }
 
}
