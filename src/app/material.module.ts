import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatFormFieldModule, 
    MatInputModule, MatDatepickerModule, MatNativeDateModule, 
    MatCheckboxModule, 
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    MatBadgeModule,
    MatRadioModule,
    MatSnackBarModule} from '@angular/material';

@NgModule ({
    imports:[
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatDialogModule,
        MatBadgeModule,
        MatRadioModule,
        MatSnackBarModule
    ],
    exports:[
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatDialogModule,
        MatBadgeModule,
        MatRadioModule,
        MatSnackBarModule
    ]
})

export class MaterialModule {}