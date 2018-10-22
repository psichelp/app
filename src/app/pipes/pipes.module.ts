import { NgModule } from '@angular/core';
import { SanitizeHtmlPipe } from './sanitize-html/sanitize-html';
import { OrderByHtmlPipe } from './orderby-html/orderby-html';
@NgModule({
	declarations: [SanitizeHtmlPipe,OrderByHtmlPipe],
	imports: [],
	exports: [SanitizeHtmlPipe, OrderByHtmlPipe]
})
export class PipesModule {
	static forRoot() {
		return {
			ngModule: PipesModule,
			providers: [SanitizeHtmlPipe, OrderByHtmlPipe],
		};
	 }
}
