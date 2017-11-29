/**
 * @flow
 * @relayHash 578a68a91436c8b908fef23bafd7b4c1
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type Routes_App_QueryResponse = {|
  +viewer: ?{| |};
|};
*/


/*
query Routes_App_Query {
  viewer {
    ...App_viewer
  }
}

fragment App_viewer on Viewer {
  isLoggedIn
  userName
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Routes_App_Query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "viewer",
        "args": null,
        "concreteType": "Viewer",
        "name": "__viewer_viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "App_viewer",
            "args": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Root"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "Routes_App_Query",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "Routes_App_Query",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "isLoggedIn",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "userName",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "kind": "LinkedHandle",
        "alias": null,
        "args": null,
        "handle": "viewer",
        "name": "viewer",
        "key": "",
        "filters": null
      }
    ]
  },
  "text": "query Routes_App_Query {\n  viewer {\n    ...App_viewer\n  }\n}\n\nfragment App_viewer on Viewer {\n  isLoggedIn\n  userName\n}\n"
};

module.exports = batch;
