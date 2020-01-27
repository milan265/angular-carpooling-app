import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatFormFieldModule, 
    MatInputModule, MatDatepickerModule, MatNativeDateModule, 
    MatCheckboxModule, 
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    MatBadgeModule,
    MatRadioModule} from '@angular/material';

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
        MatRadioModule
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
        MatRadioModule
    ]
})

export class MaterialModule {}