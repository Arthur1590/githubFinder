import React from 'react'
import s from './home.module.scss'
import { useSelector } from 'react-redux'
import UserRepos from './UserRepos'

const Home = () => {
	const { user, status, error } = useSelector(state => state.search)


	if (status === 'loading')
		return <p className={s.server__response_pend}>Loading...</p>
	if (status === 'failed')
		return <p className={s.server__response_error}>{error}</p>

	const handlerCancel = () => {
		window.location.reload()
	}

	return (
		<div className={s.home}>
			<div className='container'>
				<div className={s.home__content}>
					{user ? (
						<div className={s.home__content_server}>
							<div className={s.home__info}>
								<h2>{user.login}</h2>
								<img src={user.avatar_url} alt={user.login} width='100' />
								<p>{user.bio}</p>
								<p>Country: {user.location}</p>
								<p>Followers: {user.followers}</p>
								<p>Following: {user.following}</p>
								<p>Repositories: {user.public_repos}</p>
								<div className={s.home__content_form}>
									<a
										className={s.home__content_link}
										href={user.html_url}
										target='_blank'
										rel='noopener noreferrer'
									>
										View Profile
									</a>
									<button onClick={handlerCancel}>Reset</button>
								</div>
							</div>

							<div className={s.home__addInfo}>
								<UserRepos />
							</div>
						</div>
					) : (
						<p className={s.titul}>--Start Search__</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default Home
