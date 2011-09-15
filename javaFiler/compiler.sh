#
# keytool -genkey -keyalg rsa -alias qiimeFiles -keystore qiime.jks -keypass 1234.qiime -storepass 1234.qiime -validity 365
# keytool -export -keystore qiime.jks -storepass 1234.qiime -alias qiimeFiles -file qiime.cer
#
# appletviewer -J-Djava.security.policy=./applet.policy filer.html


echo "javac $1.java"
javac -Xlint:all,-serial $1.java -source 1.4

echo "jar cvf $1.jar $1.class"
jar cvf $1.jar $1.class

echo "jarsigner -keystore qiime.jks -storepass 1234.qiime -keypass 1234.qiime -signedjar S$1.jar $1.jar qiimeFiles"
jarsigner -keystore qiime.jks -storepass 1234.qiime -keypass 1234.qiime -signedjar S$1.jar $1.jar qiimeFiles
