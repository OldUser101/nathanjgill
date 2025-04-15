**HybridApp** is a Windows application for creating and managing desktop style web apps.

### What was it for?

It was created to allow for a [Progressive Web App](https://en.wikipedia.org/wiki/Progressive_web_app) (PWA) style experience of any website, without any changes required from the website developers. 

### Initial Version (Early 2023)

The initial version (now deprecated) was written in **Visual Basic .NET**, and used a basic WinForms UI for creating web apps, and a **Microsoft WebView2** container for running them.

This version is still available, under the name **HybridAppLegacy** [here](https://github.com/OldUser101/HybridAppLegacy).

The initial version had many problems, one was the lack of a proper management interface, making it hard to remove websites that you had previously installed, requiring manual deletion of its folder and shortcuts.

It was also incredibly inefficient, requiring a separate copy of the WebView2 runtime for every website, and the configuration system was poorly designed.

### Redesign (Late 2024)

Late December 2024, after practising UI design with the new **WinUI3** in C#, I felt it would be a good opportunity to revisit the project, rebuilding it from the ground-up.

The new HybridApp (which can be found [here](https://github.com/OldUser101/HybridApp)) would feature a complete UI redesign, with a stored configuration of installed websites, and many customisation features.

After a couple of weeks of work (and many late nights), I had a system which could create and launch sites, providing a management interface for ease of use. Configuration data was stored as XML, and sites were indexed by directory, and were opened by a single, unified host to reduce the number of binaries stored per site.

After this, I added a few more features that further improved upon the original application, including:

 - A quick access page which sites can be pinned to.
 - A configuration page for each site allowing users to configure site options like custom icons.
 - General improvements to the UI.

More recently, I have worked on adding offline site caching, and automatic updates to the application itself.