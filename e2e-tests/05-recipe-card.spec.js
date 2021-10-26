/**
 * WordPress dependencies
 */
import {
	getEditedPostContent,
	insertBlock,
	createNewPost,
} from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import json from '../05-recipe-card/block.json';
const { title, name } = json;

// Increase the timeout limit for this test.
jest.setTimeout( 100000 );

it( `${ title } block should be available`, async () => {
	await createNewPost();
	await insertBlock( title );

	// Check if block was inserted
	expect( await page.$( `[data-type="${ name }"]` ) ).not.toBeNull();

	expect( await getEditedPostContent() ).toMatchInlineSnapshot( `
		"<!-- wp:gutenberg-examples/example-05-recipe-card -->
		<div class=\\"wp-block-gutenberg-examples-example-05-recipe-card\\"><h2></h2><h3>Ingredients</h3><ul class=\\"ingredients\\"></ul><h3>Instructions</h3><div class=\\"steps\\"></div></div>
		<!-- /wp:gutenberg-examples/example-05-recipe-card -->"
	` );
} );
