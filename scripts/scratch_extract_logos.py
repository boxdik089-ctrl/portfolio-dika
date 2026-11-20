import re
import json

bundle_path = r'C:\Users\Hype AMD\.gemini\antigravity\brain\73f32cd5-9018-452e-bf40-e08d27c74f6e\scratch\alfari_bundle.js'
with open(bundle_path, 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

var_names = ['ac', 'lc', 'uc', 'hc', 'pc', 'oc', 'sc', 'cc', 'ic', 'mc', 'tc', 'fc', 'dc', 'nc', 'rc']

results = {}
for v in var_names:
    # look for v=`...` or v="..." or v='...' or v=identifier
    m = re.search(r'(?:var\s+|,\s*)' + v + r'\s*=\s*(`[^`]+`|"[^"]+"|\'[^\']+\')', text)
    if m:
        results[v] = m.group(1)[1:-1]
        print(f'{v}: found string length {len(results[v])}')
    else:
        m2 = re.search(r'(?:var\s+|,\s*)' + v + r'\s*=\s*([a-zA-Z0-9_$]+)', text)
        if m2:
            print(f'{v} = identifier {m2.group(1)}')
            results[v] = f'identifier:{m2.group(1)}'
        else:
            print(f'{v} neither')

with open(r'C:\Users\Hype AMD\.gemini\antigravity\brain\73f32cd5-9018-452e-bf40-e08d27c74f6e\scratch\extracted_logos.json', 'w', encoding='utf-8') as out:
    json.dump(results, out, indent=2)

print('Done extracting logos!')

