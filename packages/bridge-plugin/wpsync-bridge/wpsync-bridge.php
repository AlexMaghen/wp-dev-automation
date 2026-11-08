<?php
/**
 * Plugin Name:       wpsync bridge
 * Description:       Temporary bridge used by the wpsync command-line tool to copy this site to a local development copy and publish it back. It stays inactive between runs and deactivates itself two hours after activation.
 * Version:           0.1.1
 * Requires at least: 5.6
 * Requires PHP:      7.4
 * Author:            wp-dev-automation
 * License:           GPL-2.0-or-later
 *
 * @package WpsyncBridge
 */

defined( 'ABSPATH' ) || exit;

define( 'WPSYNC_BRIDGE_MAIN', __FILE__ );

require_once __DIR__ . '/includes/protocol.php';
require_once __DIR__ . '/includes/class-wpsync-guard.php';
require_once __DIR__ . '/includes/class-wpsync-info.php';
require_once __DIR__ . '/includes/class-wpsync-paths.php';
require_once __DIR__ . '/includes/class-wpsync-db.php';
require_once __DIR__ . '/includes/class-wpsync-files.php';
require_once __DIR__ . '/includes/class-wpsync-maintenance.php';
require_once __DIR__ . '/includes/class-wpsync-changes.php';
require_once __DIR__ . '/includes/class-wpsync-stage.php';
require_once __DIR__ . '/includes/class-wpsync-update.php';

// As early as a plugin can: during a push, everyone but the bridge sees the maintenance page.
Wpsync_Maintenance::gate();

register_activation_hook( __FILE__, array( 'Wpsync_Guard', 'on_activate' ) );
register_deactivation_hook( __FILE__, array( 'Wpsync_Guard', 'on_deactivate' ) );

add_action( 'plugins_loaded', array( 'Wpsync_Guard', 'check_deadline' ) );
add_action( 'rest_api_init', 'wpsync_register_routes' );

/**
 * Registers the bridge's REST routes. Every route uses the same permission check.
 */
function wpsync_register_routes() {
	$routes = array(
		WPSYNC_ROUTE_INFO        => array( 'GET', array( 'Wpsync_Info', 'handle' ), array() ),
		WPSYNC_ROUTE_DB_TABLES   => array( 'GET', array( 'Wpsync_Db', 'handle_tables' ), array() ),
		WPSYNC_ROUTE_DB_ROWS     => array(
			'GET',
			array( 'Wpsync_Db', 'handle_rows' ),
			array(
				'table'  => array(
					'type'     => 'string',
					'required' => true,
				),
				'cursor' => array( 'type' => 'string' ),
			),
		),
		WPSYNC_ROUTE_FILES_LIST  => array( 'GET', array( 'Wpsync_Files', 'handle_list' ), array( 'cursor' => array( 'type' => 'string' ) ) ),
		WPSYNC_ROUTE_FILES_FETCH => array( 'POST', array( 'Wpsync_Files', 'handle_fetch' ), array() ),
		WPSYNC_ROUTE_CHANGES     => array(
			'GET',
			array( 'Wpsync_Changes', 'handle' ),
			array(
				'since' => array(
					'type'     => 'string',
					'required' => true,
				),
			),
		),
		WPSYNC_ROUTE_STAGE_BEGIN => array( 'POST', array( 'Wpsync_Stage', 'handle_begin' ), array() ),
		WPSYNC_ROUTE_STAGE_CHUNK => array(
			'PUT',
			array( 'Wpsync_Stage', 'handle_chunk' ),
			array(
				'stage'  => array(
					'type'     => 'string',
					'required' => true,
				),
				'part'   => array(
					'type'     => 'string',
					'required' => true,
				),
				'seq'    => array(
					'type'     => 'integer',
					'required' => true,
				),
				'sha256' => array(
					'type'     => 'string',
					'required' => true,
				),
			),
		),
		WPSYNC_ROUTE_STAGE_APPLY => array( 'POST', array( 'Wpsync_Stage', 'handle_apply' ), array() ),
		WPSYNC_ROUTE_ROLLBACK    => array( 'POST', array( 'Wpsync_Stage', 'handle_rollback' ), array() ),
		WPSYNC_ROUTE_FINALIZE    => array( 'POST', array( 'Wpsync_Stage', 'handle_finalize' ), array() ),
		WPSYNC_ROUTE_SELF_UPDATE => array( 'POST', array( 'Wpsync_Update', 'handle' ), array() ),
		WPSYNC_ROUTE_FILES_READ  => array(
			'GET',
			array( 'Wpsync_Files', 'handle_read' ),
			array(
				'path'   => array(
					'type'     => 'string',
					'required' => true,
				),
				'offset' => array(
					'type'     => 'integer',
					'required' => true,
				),
				'length' => array(
					'type'     => 'integer',
					'required' => true,
				),
			),
		),
	);
	foreach ( $routes as $path => $route ) {
		register_rest_route(
			WPSYNC_REST_NAMESPACE,
			$path,
			array(
				'methods'             => $route[0],
				'callback'            => $route[1],
				'permission_callback' => array( 'Wpsync_Guard', 'permission' ),
				'args'                => $route[2],
			)
		);
	}
}
