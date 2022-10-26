import { Component } from "@angular/core";
import { getStorage, ref } from "firebase/storage";
import { app } from "../config/firebase-init";

const storage = getStorage(app);

// Points to the root reference
const storageRef = ref(storage);

// Points to 'prescriptions'
const prescriptionsRef = ref(storageRef, 'prescriptions');

@Component({
    selector: 'prescription',
    templateUrl: './prescription-component.html',
    styleUrls: ['../app.component.css'],
})

export class AppPrescription {

}
