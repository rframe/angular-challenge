export class Project {
  id: string;
  title: string;
  rating: 1 | 2 | 3 | 4 | 5; // number 1 -5

  constructor(project: Project) {
    if (!!project) {
      this.id = project.id;
      this.title = project.title;
      this.rating = project.rating;
    }
  }
}
