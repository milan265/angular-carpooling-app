import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatFormFieldModule, 
    MatInputModule, MatDatepickerModule, MatNativeDateModule, 
    MatCheckboxModule, 
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    MatBadgeModule} from '@angular/material';

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
        MatBadgeModule
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
        MatBadgeModule
    ]
})

export class MaterialModule {}