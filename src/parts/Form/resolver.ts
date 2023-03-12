import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
	// string と number の invalid_type エラーメッセージのカスタマイズ
	if (issue.code === z.ZodIssueCode.invalid_type) {
		if (issue.expected === 'string') {
			return { message: '文字列を入力してください' };
		}
		if (issue.expected === 'number') {
			return { message: '数字を入力してください' };
		}
	}
	// 上記以外はデフォルトで定義されたエラーを返す
	return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

// ____________________________________________________________
//
export const resolver = zodResolver(
	z.object({
		name: z.string().nonempty('入力してください'),
		age: z.number().int('整数を入力してください').positive('正の数を入力して下さい'),
		email: z
			.string()
			.nonempty('入力してください')
			.regex(/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/, {
				message: '不正な形式です',
			}),
		phone: z.string().regex(/^[0-9]{2,5}-[0-9]{2,5}-[0-9]{2,5}$/, {
			message: '不正な形式です',
		}),
	}),
);
