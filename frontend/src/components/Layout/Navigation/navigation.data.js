import { AiOutlineUser, AiOutlineUnorderedList } from 'react-icons/ai'
import { HiOutlineClipboardList } from 'react-icons/hi'

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
]