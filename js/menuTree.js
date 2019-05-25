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
		   { 'title': 'Getting Started' },
		   { 'title': 'Restoring Privacy' },
		   { 'title': 'Innovative Network' },
		   { 'title': 'Funding Launch' },
			 { 'title': 'Economic Model' },
			 { 'title': 'Open Governance' },
		   { 'title': 'Main Features' }
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
			{ 'title': 'Masternode-guide' },
			{ 'title': 'Exchanges' },
			{ 'title': 'Mining-pools'},
			{ 'title': 'External-service'},
			{ 'title': 'Crowdfundings'},
			{ 'title': 'FAQ' },
		]
	},
	{
		'title': 'Explorer',
		'items': [
			{
				'title': 'Index',
			  	'url': 'https://explorer.veles.network'
			},
			{
				'title': 'Richlist',
				'url': 'https://explorer.veles.network/Richlist'
			},
			{
				'title': 'Masternodes',
				'url': 'https://explorer.veles.network/masternodes'
			},
			{
				'title': 'Movement',
				'url': 'https://explorer.veles.network/movement'
			},
			{
				'title': 'Mining-stats',
				'url': 'https://explorer.veles.network/miningstats'
			},
			{
				'title': 'Api',
				'url': 'https://explorer.veles.network/info'
			}
		]
	}
];
