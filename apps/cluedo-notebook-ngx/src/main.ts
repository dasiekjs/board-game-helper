import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import {AppRoot} from "./app/pages/app-root/app-root";

bootstrapApplication(AppRoot, appConfig).catch((err) => console.error(err));
