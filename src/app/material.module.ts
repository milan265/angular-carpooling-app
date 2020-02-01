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
    MatSnackBarModule,
    MatTabsModule,
    MatCardModule} from '@angular/material';

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
        MatSnackBarModule,
        MatTabsModule,
        MatCardModule
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
        MatSnackBarModule,
        MatTabsModule,
        MatCardModule
    ]
})

export class MaterialModule {}