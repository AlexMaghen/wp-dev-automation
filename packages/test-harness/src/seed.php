<?php
/**
 * Seeds the harness database with the cases a pull must copy exactly. Run inside the harness:
 *   wp eval-file /var/www/html/seed.php <posts> <composite-rows>
 * Idempotent: it replaces whatever an earlier run created.
 */

global $wpdb;
$posts          = (int) $args[0];
$composite_rows = (int) $args[1];
$home           = home_url();

foreach ( get_posts( array( 'post_type' => 'post', 'numberposts' => -1, 'post_status' => 'any', 's' => 'Seed post' ) ) as $p ) {
	wp_delete_post( $p->ID, true );
}
for ( $i = 1; $i <= $posts; $i++ ) {
	wp_insert_post(
		array(
			'post_title'   => "Seed post $i",
			'post_content' => "Link: <a href=\"$home/page-$i\">page</a> 100% 'quoted' \\back",
			'post_status'  => 'publish',
		)
	);
}

// URLs inside a serialized array and inside JSON, as plugins store them.
update_option( 'wpsync_seed_serialized', array( 'url' => $home . '/logo.png', 'nested' => array( 'n' => 1 ) ) );
update_option( 'wpsync_seed_json', wp_json_encode( array( 'url' => $home . '/x' ) ) );

$p = $wpdb->prefix;
$wpdb->query( "DROP TABLE IF EXISTS {$p}wpsync_nopk, {$p}wpsync_blob, {$p}wpsync_composite" );

// No primary key: paged by offset. Quotes, backslashes, % and NULL.
$wpdb->query( "CREATE TABLE {$p}wpsync_nopk ( label VARCHAR(50), note TEXT NULL )" );
$wpdb->insert( "{$p}wpsync_nopk", array( 'label' => 'plain', 'note' => 'x' ) );
$wpdb->insert( "{$p}wpsync_nopk", array( 'label' => 'nulls', 'note' => null ) );
$wpdb->insert( "{$p}wpsync_nopk", array( 'label' => 'quotes', 'note' => "it's \\ \"q\" 50% _under_ \n newline" ) );

// Binary columns: zero bytes, quotes, backslash, newline, empty and NULL.
$wpdb->query( "CREATE TABLE {$p}wpsync_blob ( id INT PRIMARY KEY, data BLOB, bin VARBINARY(8) )" );
$wpdb->query( "INSERT INTO {$p}wpsync_blob VALUES (1, 0x00FF27225C0A0D1A, 0xDEADBEEF), (2, '', NULL), (3, NULL, 0x00)" );

// Two-column primary key with more rows than one chunk.
$wpdb->query( "CREATE TABLE {$p}wpsync_composite ( a INT, b VARCHAR(10), v TEXT, PRIMARY KEY (a, b) )" );
$values = array();
for ( $i = 0; $i < $composite_rows; $i++ ) {
	$values[] = '(' . intdiv( $i, 3 ) . ", 'k" . ( $i % 3 ) . "', 'row $i')";
}
$wpdb->query( "INSERT INTO {$p}wpsync_composite VALUES " . implode( ',', $values ) );

activate_plugin( 'sample-plugin/sample-plugin.php' );
echo "seeded\n";
