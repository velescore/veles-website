/*
 * Veles Website sctucture in js/json format.
 *
 * Copyright (C) 2019 The Veles Core developers
 * Author: Altcoin Baggins
 *
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation, either version 3
 * of the License, or (at your option) any later version.
 */
var menuTree = [
	{
		'page': 'index',
	   	'title': 'Home',
	   	'sections': [
		   { 'title': 'Getting-started' },
		   { 'title': 'Introduction' },
		   { 'title': 'Dynamic-character' },
		   { 'title': 'Funding' },
		   { 'title': 'Main-features' },
		   { 'title': 'Twitter-feed'}
	   ],
	   'hideFromNav': true,
	},
	{
	   'title': 'Roadmap',
	   'sections': [
		   { 'title': 'Q1' },
		   { 'title': 'Q2' },
		   { 'title': 'Q3' },
		   { 'title': 'Q4' }
	   ]
	},
	{
	   'title': 'Team',
	   'sections': [
		   { 'title': 'About-us' },
		   { 'title': 'AltcoinBaggins' },
		   { 'title': 'Mdfkbtc' },
		   { 'title': 'Uhlik' },
		   { 'title': 'Virtuado' },
			 { 'title': 'Maty' }
	   ]
	},
	{
	   'title': 'Download',
	   'sections': [
		   { 'title': 'Linux Wallet' },
		   { 'title': 'Windows Wallet' },
		   { 'title': 'macOS Wallet' },
		   { 'title': 'RaspberryPi Wallet' },
		   { 'title': 'Source-code' },
		   { 'title': 'Whitepaper' }

	   ]
	},
	{
		'title': 'Resources',
		'items': [
			{ 'title': 'Coin-specs' },
			{ 'title': 'Whitepaper' },
			{ 'title': 'Mining-pools'},
			{ 'title': 'External-service'},
			{ 'title': 'Crowdfundings'},
			{ 'title': 'FAQ' },
			{ 'title': 'Wiki' },
		]
	},
	{
		'title': 'Explorer',
		'items': [
			{
				'title': 'Index',
			  	'url': 'http://explorer.veles.network'
			},
			{
				'title': 'Richlist',
				'url': 'http://explorer.veles.network/Richlist'
			},
			{
				'title': 'Masternodes',
				'url': 'http://explorer.veles.network/masternodes'
			},
			{
				'title': 'Movement',
				'url': 'http://explorer.veles.network/movement'
			},
			{
				'title': 'Mining-stats',
				'url': 'http://explorer.veles.network/miningstats'
			},
			{
				'title': 'Api',
				'url': 'http://explorer.veles.network/info'
			}
		]
	}
];
