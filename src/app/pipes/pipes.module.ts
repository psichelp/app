import { NgModule } from '@angular/core';
import { SanitizeHtmlPipe } from './sanitize-html/sanitize-html';
@NgModule({
	declarations: [SanitizeHtmlPipe],
	imports: [],
	exports: [SanitizeHtmlPipe]
})
export class PipesModule {
	static forRoot() {
		return {
			ngModule: PipesModule,
			providers: [SanitizeHtmlPipe],
		};
	 }
}
