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
      'title': 'Inicio',
      'sections': [
      { 'title': 'Donde comenzar' },
      { 'title': 'Privacidad online' },
      { 'title': 'Red Innovadora' },
      { 'title': 'Lancamiento inicial' },
      { 'title': 'Modelo económico' },
      { 'title': 'Gobierno abierto' },
       { 'title': 'Caracterìsticas' }
    ],
    'hideFromNav': true,
  },
  {
      'title': 'dVPN',
      'items': [
          { 
            'title': 'dVPN',
            'sections': [
              { 'title': 'Lanzamiento dVPN' },
              { 'title': 'Descargar Configuración' }
            ]
          },
          { 
            'page': 'linux-guide',
            'title': 'Guía Linux',
            'sections': [
              { 'title': 'Guía OpenVPN' },
              { 'title': 'Guía Stunnel' },
              { 'title': 'Guía ObfsProxy'},
              { 'title': 'Testear Conexión' }
            ]
          },
          { 
            'page': 'windows-guide',  
            'title': 'Guía Windows',
            'sections': [
              { 'title': 'Guía OpenVPN' },
              { 'title': 'Guía Stunnel' },
              { 'title': 'Guía ObfsProxy'},
              { 'title': 'Testear Conexión' }
            ]
          },
          { 
            'page': 'osx-guide',
            'title': 'Guía OSX',
            'sections': [
              { 'title': 'Guía OpenVPN' },
              { 'title': 'Guía Stunnel' },
              { 'title': 'Testear Conexión' }
            ]
          },
          { 
            'page': 'android-guide',
            'title': 'Guía Android',
            'sections': [
              { 'title': 'Guía OpenVPN' },
              { 'title': 'Testear Conexión' }
            ]
          },
          { 
            'page': 'ios-guide',
            'title': 'Guía iOS',
            'sections': [
              { 'title': 'Guía OpenVPN' },
              { 'title': 'Testear Conexión' }
            ]
          }
      ]
  },
  {
    'page': 'roadmap',
      'title': 'Hoja de ruta',
      'sections': [
        { 'title': 'Q1' },
        { 'title': 'Q2' },
        { 'title': 'Q3' },
         { 'title': 'Q4' }
      ]
  },
  {
    'page': 'team',
      'title': 'Equipo',
      'sections': [
      { 'title': 'Acerca de' },
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
    'page': 'download',
      'title': 'Descargar',
      'sections': [
        { 'title': 'Billetera Linux' },
        { 'title': 'Billetera Windows' },
        { 'title': 'Billetera macOS' },
        { 'title': 'Billetera RaspberryPi' },
         { 'title': 'Codigo fuente' }
      ]
  },
  {
    'page': 'resources',
      'title': 'Recursos',
      'items': [
        { 'page': 'coin-specs', 'title': 'Especificaciones' },
        { 'page': 'whitepaper', 'title': 'Whitepaper' },
        { 'page': 'masternode-guide', 'title': 'Guìa de MNs' },
        { 'page': 'exchanges', 'title': 'Exchanges' },
        { 'page': 'mining-pools', 'title': 'Pools de Minado'},
        { 'page': 'external-service', 'title': 'Servicios externos'},
        { 'page': 'crowdfundings', 'title': 'Recaudaciònes comunitarias'},
        { 'page': 'faq', 'title': 'FAQ' }
      ]
  },
  {
  'page': 'Wallet',
      'title': 'Billetera',
      'items': [
          {
            'title': 'Inicio',
              'url': 'https://wallet.veles.network'
          },
          {
            'title': 'Ingresar',
            'url': 'https://wallet.veles.network/#wallet'
          },
          {
            'title': 'Generar',
            'url': 'https://wallet.veles.network/#newAddress'
          },
          {
            'title': 'Verificar',
            'url': 'https://wallet.veles.network/#verify'
          },
          {
            'title': 'Firmar',
            'url': 'https://wallet.veles.network/#sign'
          },
          {
            'title': 'Broadcast',
            'url': 'https://wallet.veles.network/#broadcast'
          }
      ]
  },
  {
  'page': 'Explorer',
      'title': 'Explorador',
      'items': [
          {
              'title': 'Inicio',
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
              'title': 'Movimiento',
              'url': 'https://explorer.veles.network/movement'
          },
          {
              'title': 'Estadìsticas de minado',
              'url': 'https://explorer.veles.network/miningstats'
          },
          {
              'title': 'Api',
              'url': 'https://explorer.veles.network/info'
          }
      ]
  }
];
