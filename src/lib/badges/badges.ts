export type BadgeLevel = 'bronze' | 'silver' | 'gold' | undefined;
export type BadgeType = 'completion' | 'perfect_score' | 'above_average' | 'average';
export type Badge = {
	name: string;
	description: string;
	imageUrl: string;
};

export const BADGES: Record<BadgeType, Record<NonNullable<BadgeLevel>, Badge>> = {
	completion: {
		bronze: {
			name: 'Getting Over It: Bronze',
			description: 'You completed one presentation!',
			imageUrl:
				'https://gateway.pinata.cloud/ipfs/bafkreidrtdcqqpiewnwzttqvabxkna4bwibmefxlql5agz235z3opgx6ru'
		},
		silver: {
			name: 'Getting Over It: Silver',
			description: 'You completed three presentations!',
			imageUrl:
				'https://gateway.pinata.cloud/ipfs/bafkreihuea4uyszm57admnx5otb5hskuii6rg72gzipz7lizhqaez6yimq'
		},
		gold: {
			name: 'Getting Over It: Gold',
			description: 'You completed FIVE presentations!',
			imageUrl:
				'https://gateway.pinata.cloud/ipfs/bafkreigfdn2ijlaywjbjoedm3zmzdi26df5vzfamxpqucmxcnvxzbsjaxa'
		}
	},
	perfect_score: {
		bronze: {
			name: 'Getting a 100: Bronze',
			description: 'You got a score of perfect score on one presentation!',
			imageUrl:
				'https://gateway.pinata.cloud/ipfs/bafkreig75kpwq6osdb2ca7zo34ng5qzbwdrosbrotqsbpvbsplhifuuqv4'
		},
		silver: {
			name: 'Getting a 100: Silver',
			description: 'You got a perfect score on three presentations!',
			imageUrl:
				'https://gateway.pinata.cloud/ipfs/bafkreihucccvnma3o4oxztagitnxu2qowjcb7x3eajkzd7zsvgvpbc6gwy'
		},
		gold: {
			name: 'Getting a 100: Gold',
			description: 'You got a perfect score on FIVE presentations!',
			imageUrl:
				'https://gateway.pinata.cloud/ipfs/bafkreig5vffd3q2lfalfteqat2lig5er64zv6rykcfw5zbhgxbdj4tv57a'
		}
	},
	above_average: {
		bronze: {
			name: 'Getting a 80: Bronze',
			description: 'You got an above average score on one presentation.',
			imageUrl:
				'https://gateway.pinata.cloud/ipfs/bafkreih3cbyas2zzt54dcxvjrgsqna3g7ag6wft5itvnk4iwppiyu2szj4'
		},
		silver: {
			name: 'Getting a 80: Silver',
			description: 'You got an above average score on three presentations.',
			imageUrl:
				'https://gateway.pinata.cloud/ipfs/bafkreifw6zhufzjciqbshix72l33vty2dbvh377qcosovw56yucbvs34pm'
		},
		gold: {
			name: 'Getting a 80: Gold',
			description: 'You got an above average score on FIVE presentations!',
			imageUrl:
				'https://gateway.pinata.cloud/ipfs/bafkreife6mmr5jx4fywvxw6izjzs7jxgfrf2uglqilblss76smwznajola'
		}
	},
	average: {
		bronze: {
			name: 'Getting a 50: Bronze',
			description: 'You got an average score on one presentation.',
			imageUrl:
				'https://gateway.pinata.cloud/ipfs/bafkreid6obyqwcilnlilw3eqvrgxgsqrqiqqhwjv3gcehhbllx65pwkmhq'
		},
		silver: {
			name: 'Getting a 50: Silver',
			description: 'You got an average score on three presentations.',
			imageUrl:
				'https://gateway.pinata.cloud/ipfs/bafkreidojdjwrlbnb7go2q7ugc3liygqtksbesxni2druzn4xb7gky37qe'
		},
		gold: {
			name: 'Getting a 50: Gold',
			description: 'You got an average score on FIVE presentations.',
			imageUrl:
				'https://gateway.pinata.cloud/ipfs/bafkreieu24rdvev3g52el4xkzxzs2zp7kgdprzaazbwyve7ptp4vdzmb7m'
		}
	}
};
