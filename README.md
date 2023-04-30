# notebook

`notebook` is a modular and extensible note-taking application designed to be easy to use while being highly customizable through a plugin architecture. Users can compose their notebook's functionality piece by piece, tailoring it to their specific needs. The application aims to be platform-agnostic, with the initial implementation targeting the command line and text editors. Once a robust and flexible API is developed, efforts will focus on extending it to the web.

## Development Status

`notebook` is currently under active development.

## Design Principles

To ensure the success of this project, we strive to adhere to the following design principles:

1. **Platform-agnostic core**: The core package contains shared, platform-independent functionality, providing APIs and utilities for various platforms.

2. **Plugins**: The monorepo structure organizes plugins into separate directories for different platforms, maintaining modularity and extensibility.

3. **Design patterns**: We aim to use well established design patterns and best practices, including dependency injection, separation of concerns, and the single responsibility principle.

4. **Testing**: We adopt a test-driven development (TDD) approach, writing unit tests for individual components and integration tests for the entire system.

5. **Functional and object-oriented design**: We play to TypeScript's strengths, remaining open to the best aspects of both functional and object-oriented paradigms, optimizing for a flexible and maintainable codebase.
