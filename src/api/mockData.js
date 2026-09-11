/**
 * Mock data matching the exact backend API contract.
 * Used during development; replaced by real POST /analyze call later.
 */

export const MOCK_FIRE_EXTINGUISHER = {
  specification:
    'Required portable fire extinguishers for electrical server room operating at 240V.',
  recommendations: [
    {
      standard_number: 'IS 2190',
      version_year: '2010',
      status: 'current',
      confidence: 0.895,
      action: 'recommended',
      why: 'IS 2190 specifies selection, installation, and maintenance of first-aid fire extinguishers suitable for electrical hazard areas.',
      replacement_standard: null,
      ambiguous: false,
      ambiguity_reason: null,
    },
    {
      standard_number: 'IS 15683',
      version_year: '2018',
      status: 'current',
      confidence: 0.71,
      action: 'manual_verification',
      why: 'Covers portable fire extinguisher specification generally but does not address electrical-hazard-specific class.',
      replacement_standard: null,
      ambiguous: true,
      ambiguity_reason:
        'This standard has multiple parts — confirm which part applies to your equipment type.',
    },
  ],
  areas_to_verify: [
    'Confirm the extinguisher class (ABC/CO2) matches electrical hazard requirements before citing in the tender.',
  ],
};

export const MOCK_PVC_CABLES = {
  specification:
    'PVC insulated cables for building wiring in a residential apartment complex.',
  recommendations: [
    {
      standard_number: 'IS 694',
      version_year: '2020',
      status: 'current',
      confidence: 0.92,
      action: 'recommended',
      why: 'IS 694 covers PVC insulated cables and cords for working voltages up to and including 1100V, suitable for building wiring.',
      replacement_standard: null,
      ambiguous: false,
      ambiguity_reason: null,
    },
    {
      standard_number: 'IS 1554',
      version_year: '2006',
      status: 'superseded',
      confidence: 0.68,
      action: 'verify_replacement',
      why: 'Covers PVC insulated heavy-duty cables but has been superseded by a newer edition.',
      replacement_standard: 'IS 1554:2023',
      ambiguous: false,
      ambiguity_reason: null,
    },
  ],
  areas_to_verify: [
    'Verify the voltage rating matches the building electrical design (single-phase 240V vs three-phase 415V).',
    'Check whether fire-retardant (FR) grade cables are required per local building codes.',
  ],
};

export const MOCK_LED_LIGHTING = {
  specification:
    'LED street lighting fixtures for a municipal road widening project.',
  recommendations: [
    {
      standard_number: 'IS 16104',
      version_year: '2019',
      status: 'current',
      confidence: 0.87,
      action: 'recommended',
      why: 'IS 16104 specifies performance requirements for LED luminaires used in street and area lighting applications.',
      replacement_standard: null,
      ambiguous: false,
      ambiguity_reason: null,
    },
    {
      standard_number: 'IS 10322',
      version_year: '1998',
      status: 'withdrawn',
      confidence: 0.45,
      action: 'manual_verification',
      why: 'Previously covered general luminaire requirements but has been withdrawn and should not be cited.',
      replacement_standard: null,
      ambiguous: false,
      ambiguity_reason: null,
    },
  ],
  areas_to_verify: [],
};

export const MOCK_SAFETY_HELMETS = {
  specification:
    'Industrial safety helmets for construction site workers.',
  recommendations: [
    {
      standard_number: 'IS 2925',
      version_year: '2017',
      status: 'current',
      confidence: 0.93,
      action: 'recommended',
      why: 'IS 2925 specifies requirements for industrial safety helmets, including impact resistance and flame resistance tests.',
      replacement_standard: null,
      ambiguous: false,
      ambiguity_reason: null,
    },
  ],
  areas_to_verify: [
    'Confirm whether helmets need electrical insulation rating for sites with overhead power lines.',
  ],
};

export const MOCK_PVC_PIPES = {
  specification:
    'PVC pipes for potable water supply in a rural water distribution scheme.',
  recommendations: [
    {
      standard_number: 'IS 4985',
      version_year: '2021',
      status: 'current',
      confidence: 0.91,
      action: 'recommended',
      why: 'IS 4985 covers unplasticized PVC pipes for potable water supply, including pressure ratings and dimensional requirements.',
      replacement_standard: null,
      ambiguous: false,
      ambiguity_reason: null,
    },
    {
      standard_number: 'IS 12818',
      version_year: '2010',
      status: 'superseded',
      confidence: 0.62,
      action: 'verify_replacement',
      why: 'Covers PVC pipes for non-pressure applications — may not be appropriate for pressurized water supply.',
      replacement_standard: 'IS 12818:2022',
      ambiguous: true,
      ambiguity_reason: 'Verify whether the application is gravity-fed or pressurized before selecting this standard.',
    },
  ],
  areas_to_verify: [
    'Confirm the pipe pressure class matches the distribution system design pressure.',
  ],
};

/** Map example chip text to mock data */
export const EXAMPLE_CHIP_MAP = {
  'PVC insulated cables for building wiring': MOCK_PVC_CABLES,
  'LED street lighting fixtures': MOCK_LED_LIGHTING,
  'Industrial safety helmets': MOCK_SAFETY_HELMETS,
  'Portable fire extinguishers for a server room': MOCK_FIRE_EXTINGUISHER,
  'PVC pipes for potable water supply': MOCK_PVC_PIPES,
};

/**
 * Simulate the backend POST /analyze call.
 * Returns a promise that resolves after a realistic delay.
 */
export function mockAnalyze(specificationText) {
  // Check if the text matches one of our example specs (fuzzy match)
  const lowerText = specificationText.toLowerCase();
  for (const [chipText, data] of Object.entries(EXAMPLE_CHIP_MAP)) {
    if (lowerText.includes(chipText.toLowerCase().slice(0, 20))) {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ ...data, specification: specificationText }), 3200);
      });
    }
  }

  // Default: return fire extinguisher data with the user's spec text
  return new Promise((resolve) => {
    setTimeout(
      () => resolve({ ...MOCK_FIRE_EXTINGUISHER, specification: specificationText }),
      3200,
    );
  });
}
