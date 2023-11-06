import { AiOutlineUser, AiOutlineUnorderedList } from 'react-icons/ai'
import { HiOutlineClipboardList, HiOutlineIdentification } from 'react-icons/hi'

export const NavigationData = [
  {
		title: 'Главная',
		link: '/',
		icon: AiOutlineUser,
	},
  {
		title: 'Упражнения',
		link: '/exercises',
		icon: AiOutlineUnorderedList,
	},
	{
		title: 'Календарь',
		link: '/sessions',
		icon: HiOutlineClipboardList,
	},
	{
		title: 'Абонемент',
		link: '/pass',
		icon: HiOutlineIdentification,
	},
]