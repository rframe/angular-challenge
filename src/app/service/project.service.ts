import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {Project} from '../models/project';
import {Guid} from '../models/guid';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  // tslint:disable-next-line:variable-name
  private _projects$: ReplaySubject<Project[]> = new ReplaySubject<Project[]>();
  public projects$: Observable<Project[]> = this._projects$.asObservable();

  private projects: Map<string, Project> = new Map<string, Project>();

  constructor() { }

  /**
   *
   * @param project - project to be inserted into collection
   * @throws error - throws error if project id provide already exists in the collection
   * @return void
   */
  createProject(project: Project): void {
    // assign new guid
    project.id = project.id || Guid.newGuid();

    if (this.projects.has(project.id)) {
      throw new Error('Cannot create a project that already exists');
    }

    this.projects.set(project.id, project);
    this._projects$.next(Array.from(this.projects.values()));
  }

  /**
   * Update project
   * @param project - the project to be updated
   * @throws error - throws error if provided project id does not exists
   * @return void
   */
  updateProject(project: Project): void {
    if (!project.id || !this.projects.has(project.id)) {
      throw new Error('Cannot update a project that does not exist');
    }

    this.projects.set(project.id, project);
    this._projects$.next(Array.from(this.projects.values()));
  }

  /**
   * Remove a project from the collection of projects
   * @param project - the project to be deleted
   * @throws error - throws error if provided project id does not exists
   * @return void
   */
  deleteProject(project: Project): void {
    if (!project.id || !this.projects.has(project.id)) {
      throw new Error('Cannot delete a project that does not exist');
    }

    this.projects.delete(project.id);
    this._projects$.next(Array.from(this.projects.values()));
  }

}
