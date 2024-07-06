
export type { PopArray }


type PopArray<Type> =
	| [ Type , ... Array<Type> , Type ]
	| [ Type , ... Array<Type> ]
	| [ ... Array<Type> , Type ]

