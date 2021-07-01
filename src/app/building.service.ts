import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { GetBuildingResponse } from './dto/get-building-response';
import { Building } from './model/building';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  
  constructor(private _http: HttpClient) { }

  getBuildings(name: string): Observable<Array<Building>> {
    let headers = new HttpHeaders();
    headers = headers.set('Data-Type', 'json');
    return this._http.get<GetBuildingResponse>('http://localhost:8080/api/users/1/buildings', {headers}).
        pipe(map(value => {
          let buildings = new Array<Building>();
          value.buildings.forEach(building => {
              buildings.push(new Building(building.id, building.type)); 
          })
          return buildings;
        }))
  }

  addBuilding(type: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Data-Type', 'json');
    let building: Building = new Building(null, type);
    console.log(building)
    return this._http.post('http://localhost:8080/api/users/1/buildings', building, {headers});
  }
}