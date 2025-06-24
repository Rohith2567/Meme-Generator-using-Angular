import { Component, OnInit } from '@angular/core';
import { GeneratorService } from '../../services/generator.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

import { faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, switchMap, throwError } from 'rxjs';
import { DownloadFile } from '../directives/download-file';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FontAwesomeModule, ReactiveFormsModule, DownloadFile],
  templateUrl: './generator.html',
  styleUrls: ['./generator.scss'],
})
export class Generator implements OnInit {
  memes: { name: string; url: string }[] = [];
  selectedMeme: string | null = null;
  selectedMemeUrl: string | null = null;

  isGenerating = false;

  faTimes = faTimes;
  faSpinner = faSpinner;
  generatorForm: FormGroup;
  downloadUrl = '';
  generationError = ''

  constructor(private genService: GeneratorService, private formBuilder: FormBuilder) {
    this.generatorForm = this.formBuilder.group({
      memeSearch: '',
      text0: '',
      text1: '',
    });
  }

  ngOnInit(): void {
    // this.genService.getMemes().subscribe((memesArr) => {
    //   this.memes =  memesArr.filter(meme => meme.url !== '').slice(0, 10);
    //   console.log('Memes loaded:', this.memes);
    // });
    this.generatorForm.get('memeSearch')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchText) => this.genService.getMemes(searchText))
    ).subscribe((memesArr) => {
      this.memes = memesArr;
      this.setSelectMeme(null); // Reset selected meme when search changes
    })

    this.generatorForm.get('memeSearch')?.setValue('');
  }

  setSelectMeme = (meme: string | null): void => {
    this.selectedMeme = meme;
    this.selectedMemeUrl = this.memes.find(m => m.name === meme)?.url || null;
  };

  generateMeme() {
    this.generationError = '';
    this.clearDownloadUrl();
    if (!this.selectedMeme) {
      console.error('No meme selected');
      return;
    }
    const { text0, text1 } = this.generatorForm.value;
    console.log({ meme: this.selectedMeme, text0, text1 });
    this.isGenerating = true;

    this.genService.createMeme(
      {
        meme: this.selectedMeme,
        text0: {
          "text": text0,
          "font_size": 33
        },
        text1: {
          "text": text1,
          "font_size": 30
        }
      }
    ).pipe(
      catchError((err) => {
        this.isGenerating = false;
        switch (err.status) {
          case 429:
            this.generationError = 'Too many requests. You can only generate 3 memes in a span of 5 minutes. Please try again later.';
            break;
          default:
            this.generationError = 'Something went wrong. Please try again later.';
            break;
        }
        // setTimeout(() => {
        //   this.generationError = '';
        // }, 5000);
        return throwError(() => new Error(err));
      })
    ).subscribe((res) => {
      this.isGenerating = false;
      this.downloadUrl = res.url;
      this.generatorForm.get('text0')?.setValue('');
      this.generatorForm.get('text1')?.setValue('');
    })
  }

  clearDownloadUrl = (): void => {
    this.downloadUrl = '';
  }

  closeDownloadToast(event: MouseEvent): void {
    event.stopImmediatePropagation();
    this.clearDownloadUrl();
  }

  // clearSelectedMeme = (): void => {
  //   this.selectedMeme = null;
  //   this.selectedMemeUrl = null; 
  // }

}
