import urllib.request
import re

for port in [3000, 3001, 8001]:
    try:
        html = urllib.request.urlopen(f'http://10.200.0.50:{port}/', timeout=3).read().decode('utf-8', errors='ignore')
        matches = re.findall(r'(/assets/[^"\'&\s>]+)', html)
        print(f'Port {port} assets:', set(matches))
        dika_matches = [m for m in re.findall(r'[^"\'\s>]*dika[^"\'\s>]*', html, re.I)]
        if dika_matches:
            print(f'Port {port} dika matches:', set(dika_matches))
    except Exception as e:
        print(f'Port {port} error:', e)

