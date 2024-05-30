import React from 'react'
import s from './navbar.module.scss'
import { useState } from 'react'
import closeIcon from '../../assets/images/close.svg'
import { useDispatch } from 'react-redux'
import { fetchRepos, fetchUser } from '../searchSlice/SearchSlice'

const NavbarApp = () => {
	const [view, setView] = useState(true)
	const [username, setUsername] = useState('Arthur1590')

	const dispatch = useDispatch()

	const focusKey = e => {
		if (e.key === 'Enter') {
			handleSearch()
		}
	}

	const handleSearch = () => {
		focus()
		if (username.trim()) {
			dispatch(fetchUser(username))
			dispatch(fetchRepos(username))
			setUsername('')
		}
	}
	return (
		<>
			<div className={s.header}>
				<div className={s.container}>
					<nav className={s.nav}>
						<h1 className={s.nav__title}>GitHubFinder</h1>
						<ul className={s.nav__menu}>
							{view ? (
								<li onClick={() => setView(!view)} className={s.nav__menu_item}>
									<a href='#' className={s.nav__menu_link}>
										Find here
									</a>
								</li>
							) : (
								<div className={s.nav__controll}>
									<input
										autoFocus
										type='text'
										placeholder='Arthur1590'
										onChange={e => setUsername(e.target.value)}
										onKeyPress={focusKey}
										value={username}
									/>

									<button onClick={() => setView(!view)}>
										<img src={closeIcon} alt='' />
									</button>
								</div>
							)}
						</ul>
					</nav>
				</div>
			</div>
		</>
	)
}

export default NavbarApp
