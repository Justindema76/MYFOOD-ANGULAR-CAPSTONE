import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '../shared/models/tag';
import { FoodService } from '../services/food/food.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  
  @Input()
  foodPageTags?: string[];

  @Input()
  justifyContent: string = 'center';

  tags: Tag[] = []; // Initialize tags as an empty array
  
  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    if (!this.foodPageTags) {
      this.foodService.getAllTags().subscribe((tags: Tag[]) => {
        this.tags = tags; // Assign tags from the service
        console.log('Tags:', this.tags); // Check if tags are received
      });
    } else {
      this.tags = this.foodPageTags.map(tag => ({ name: tag, count: 0 }));
    }
  }
}
