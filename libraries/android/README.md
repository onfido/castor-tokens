# Castor Tokens

This provides _Castor_ design tokens (XML configuration) for Android.

## Get started

Initiate Maven central repositories:

```gradle
repositories {
  mavenCentral()
}
```

Add as a dependency (replacing `x.y.z` to a version required):

```gradle
dependencies {
  compile 'com.onfido.castor.tokens:x.y.z'
}
```

Then sync and perform a Gradle build.

### Use tokens (example)

Color:

```xml
android:background="@color/ods_color_background_main"
```

Dimen:

```xml
android:background="@dimen/ods_border_radius_medium"
```
