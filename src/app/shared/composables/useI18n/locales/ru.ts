import { getNoun } from '@app/shared/utils/getNoun';

export default {
	test: {
		hello: 'Привет, ',
		jobTitle: 'фронтенд разработчик',
		applesCount: ({ count }: { count: number }) => `${count} ${getNoun(5, { single: 'яблоко', dual: 'яблока', many: 'яблок' })}`,
	},
	sharing: {
		success: 'Ссылка скопирована в буфер обмена',
	},
	agreement: ({ policy, personal }: { policy: string; personal: string }): string => `Я соглашаюсь <a href="${policy}" class="link" target="_blank">с политикой конфиденциальности</a> и <a href="${personal}" class="link" target="_blank">пользовательским соглашением</a>`,
} as const;
