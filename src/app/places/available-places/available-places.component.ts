import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  // constructor(private httpClient : HttpClient ) {
  // }

  ngOnInit() {
    const subcription = this.httpClient
      .get<{ place: Place[] }>('http://localhost:3000/places')
      .subscribe({
        next: (resData) => {
          console.log(resData);
        },
      });

    this.destroyRef.onDestroy(() => {
      subcription.unsubscribe();
    });
  }
}
