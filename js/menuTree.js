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
		   { 'title': 'Virtuado' },
		   { 'title': 'Uhlik' }
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
				'page': 'explorer-index',
			  	'url': 'http://35.240.96.108:88'
			},
			{
				'title': 'Search',
				'url': 'http://35.240.96.108:88'
			},
			{
				'title': 'Richlist',
				'url': 'http://35.240.96.108:88/Richlist'
			},
			{
				'title': 'Masternodes',
				'url': 'http://35.240.96.108:88/masternodes'
			},
			{
				'title': 'Coin-info',
				'url': 'http://35.240.96.108:88/coininfo'
			},
			{
				'title': 'Mining-stats',
				'url': 'http://35.240.96.108:88/miningstats'
			},
			{
				'title': 'Api',
				'url': 'http://35.240.96.108:88/info'
			}
		]
	}
];
