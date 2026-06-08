import type { App } from 'vue';
import fixedHeader from '@app/shared/directives/fixedHeader';
import initialScroll from '@app/shared/directives/initial-scroll';
import { vMaska } from 'maska/vue';
import animate from '@/app/shared/directives/animate';
// import ymGoal from '@/app/shared/directives/ymGoal';
// import observe from '@/app/shared/directives/observe';

export default function useDirectives(AppInstance: App) {
	AppInstance
		.directive('mask', vMaska)
		.directive('animate', animate)
		.directive('initialScroll', initialScroll)
		.directive('fixed-header', fixedHeader)
		// .directive('observe', observe)
		// .directive('ym-goal', ymGoal)
	;
	return AppInstance;
}
