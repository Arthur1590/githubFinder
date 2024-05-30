import React, { useState } from 'react'
import s from './home.module.scss'
import { useSelector } from 'react-redux'

const UserRepos = () => {
	const repos = useSelector(state => state.search.repos)
	const [sortOrder, setSortOrder] = useState('newest')

	const sortRepos = (repos, order) => {
		return repos.slice().sort((a, b) => {
			const dateA = new Date(a.created_at)
			const dateB = new Date(b.created_at)
			return order === 'newest' ? dateB - dateA : dateA - dateB
		})
	}
	const sortedRepos = sortRepos(repos, sortOrder)

	return (
		<>
			<div className={s.float_btn}>
				<button onClick={() => setSortOrder('oldest')}>Сначала старые</button>
				<button onClick={() => setSortOrder('newest')}>Сначала новые</button>
			</div>

			<div className={s.repos__items}>
				{sortedRepos.map(repo => (
					<div className={s.repos__items_card}>
						<h1>{repo.name}</h1>
						<p>{repo.language}</p>
						<p>{repo.created_at}</p>
						<div className={s.links}>
							<a target='_blank' href={repo.html_url}>
								Visit Repository
							</a>
							<a target='_blank' href={repo.homepage}>
								Demo
							</a>
						</div>
					</div>
				))}
			</div>
		</>
	)
}

export default UserRepos
