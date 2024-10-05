import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService)
  if (req.method == 'GET') {
    spinner.show();
  }
  
  return next(req).pipe(finalize(()=>{spinner.hide()}))
};
