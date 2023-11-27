import xml.etree.ElementTree as ET

coverage_file = 'coverage.xml'
tree = ET.parse(coverage_file)
root = tree.getroot()

# Replace the Docker path with the repository path
for source in root.findall('.//source'):
    source.text = source.text.replace('/app', './server')

tree.write(coverage_file)
