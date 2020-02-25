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
/* Sections visible on navigation menu */
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
			{ 'title': 'AltcoinBaggins' },
			{ 'title': 'Mdfkbtc' },
			{ 'title': 'Uhlik' },
			{ 'title': 'Virtuado' },
			{ 'title': 'Maty' },
					{ 'title': 'AlexDeLarge' },
				{ 'title': 'Clover' }
		]
	},
	{
		'title': 'Download',
		'sections': [
			{ 'title': 'Linux Wallet' },
			{ 'title': 'Windows Wallet' },
			{ 'title': 'macOS Wallet' },
			{ 'title': 'RaspberryPi Wallet' },
			{ 'title': 'Source-code' }
		]
	},
	{
		'title': 'Wiki',
		'sidebarCaption': 'Pinned Articles',
		'items': [
			{ 
				'title': 'Wiki Homepage', 
				'page': 'Home.wiki' 
			},
			{ 
				'title': 'Coin Specifications', 
				'page': 'Coin-Specifications.wiki' 
			},
			{ 
				'title': 'Whitepaper', 
				'page': 'Whitepaper.wiki' 
			},
			{ 
				'title': 'dVPN Setup Guide', 
				'page': 'dVPN-Setup-Guide.wiki' 
			},
			{ 
				'title': 'Masternode Setup Guide', 
				'page': 'Masternode-Setup-Guide.wiki' 
			},
			{ 
				'title': 'Exchanges', 
				'page': 'Exchanges.wiki' 
			},
			{ 
				'title': 'Mining Pools', 
				'page': 'Mining-Pools.wiki' 
			},
			{ 
				'title': 'External Services', 
				'page': 'External-Services.wiki' 
			}
		]
	},
	{
		'title': 'Wallet',
		'items': [
			{
				'title': 'Go to WebWallet',
					'url': 'https://wallet.veles.network'
			},
			{
				'title': 'Login',
				'url': 'https://wallet.veles.network/#wallet'
			},
			{
				'title': 'Generate',
				'url': 'https://wallet.veles.network/#newAddress'
			},
			{
				'title': 'Verify',
				'url': 'https://wallet.veles.network/#verify'
			},
			{
				'title': 'Sign',
				'url': 'https://wallet.veles.network/#sign'
			},
			{
				'title': 'Broadcast',
				'url': 'https://wallet.veles.network/#broadcast'
			}
		]
	},
	{
		'title': 'Explorer',
		'items': [
			{
				'title': 'Go to Explorer',
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
	},
/* Hidden special sections */
	{
		'page': 'index',
		'title': 'Home',
		'sections': [
			{ 'title': 'Getting Started' },
			{ 'title': 'Restoring Privacy' },
			{ 'title': 'Innovative Network' },
			{ 'title': 'Funding and Launch' },
			{ 'title': 'Economic Model' },
			{ 'title': 'Open Governance' },
			{ 'title': 'Main Features' }
		],
		'hideFromNav': true,
	},
	{
		'page': 'news',
		'title': 'News',
		'hideFromNav': true,
		'itemsFromJsonID': 'news-pages-json'
	},
	{ 'page': 'crowdfundings', 'title': 'Crowdfundings', 'hideFromNav': true},
	{ 'page': 'faq', 'title': 'FAQ', 'hideFromNav': true }
/*
	{
		'title': 'dVPN',
		'items': [
				{ 
					'title': 'dVPN',
					'sections': [
						{ 'title': 'dVPN Launch' },
						{ 'title': 'Download Config' }
					]
				},
				{ 
					'page': 'linux-guide',
					'title': 'Linux Guide',
					'sections': [
						{ 'title': 'OpenVPN Guide' },
						{ 'title': 'Stunnel Guide' },
						{ 'title': 'ObfsProxy Guide'},
						{ 'title': 'Test Connection' }
					]
				},
				{ 
					'page': 'windows-guide',	
					'title': 'Windows Guide',
					'sections': [
						{ 'title': 'OpenVPN Guide' },
						{ 'title': 'Stunnel Guide' },
						{ 'title': 'ObfsProxy Guide'},
						{ 'title': 'Test Connection' }
					]
				},
				{ 
					'page': 'osx-guide',
					'title': 'OSX Guide',
					'sections': [
						{ 'title': 'OpenVPN Guide' },
						{ 'title': 'Stunnel Guide' },
						{ 'title': 'Test Connection' }
					]
				},
				{ 
					'page': 'android-guide',
					'title': 'Android Guide',
					'sections': [
						{ 'title': 'OpenVPN Guide' },
						{ 'title': 'Test Connection' }
					]
				},
				{ 
					'page': 'ios-guide',
					'title': 'iOS Guide',
					'sections': [
						{ 'title': 'OpenVPN Guide' },
						{ 'title': 'Test Connection' }
					]
				}
			]
		},
*/
];
