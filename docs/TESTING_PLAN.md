# Testing plan

This plan focuses on the parts of cookAI that can be tested deterministically without calling external APIs.

## Unit tests

### Ingredient normalisation

Test:

- case normalisation
- duplicate removal
- unsupported labels
- singular/plural variants
- empty recognition results

### Missing-ingredient calculation

Given a recognised ingredient set and a recipe ingredient list, verify that the utility returns only ingredients that are not already available.

### Allergen filtering

Verify that configured allergens are excluded before a recipe search is built.

## Service tests

Mock Google Vision and Edamam responses so tests do not depend on network access, quotas or live credentials.

Cases should include:

- successful image recognition
- provider timeout
- malformed provider response
- no food-related labels
- recipe search with no results
- partial recipe metadata

## UI tests

Prioritise:

- loading states
- error states
- empty results
- calorie filter changes
- recipe modal rendering
- missing-ingredient display

## Security regression checks

- No API keys committed to the repository
- Environment files remain ignored
- Production design does not rely on client-side secret storage

## Definition of done for a new feature

A feature is complete when its core logic has deterministic tests, provider failures are handled, and the user sees a clear loading/error/empty state where applicable.
