import {
	useBlockProps,
	useBlockEditContext,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, PanelRow, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Slider } from './wordpress-slider-plugin';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { autoplay, navigation, pagination } = attributes;
	const { clientId } = useBlockEditContext();
	const blockProps = useBlockProps();

	return (
		<>
			<div { ...blockProps }>
				<Slider attributes={ attributes } clientId={ clientId } />
			</div>

			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'wpe' ) }>
					<PanelRow>
						<ToggleControl
							label={ __( 'Autoplay', 'wpe' ) }
							checked={ autoplay }
							onChange={ ( value ) =>
								setAttributes( { autoplay: value } )
							}
							help={ __(
								'“Autoplay” will automatically advance the slides. Note: this is intentionally disabled in the editor, but will affect the front end.'
							) }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( 'Navigation', 'wpe' ) }
							checked={ navigation }
							onChange={ ( value ) =>
								setAttributes( { navigation: value } )
							}
							help={ __(
								'“Navigation” will display arrows so user can navigate forward/backward.'
							) }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( 'Pagination', 'wpe' ) }
							checked={ pagination }
							onChange={ ( value ) =>
								setAttributes( { pagination: value } )
							}
							help={ __(
								'“Pagination” will display dots along the bottom for user to click through slides.'
							) }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
