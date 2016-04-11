// Master Operational Hierarchy DDL v1.0

CREATE property V.id string

CREATE property E.id string

CREATE CLASS OrgUnit extends V

CREATE CLASS OrgUnit_CONTAINS_OrgUnit extends E
CREATE property OrgUnit_CONTAINS_OrgUnit.out link OrgUnit
CREATE property OrgUnit_CONTAINS_OrgUnit.in link OrgUnit

CREATE CLASS FrontToBackProcess extends V

CREATE CLASS CBM extends V

CREATE CLASS CBM_CONTAINS_CBM extends E
CREATE property CBM_CONTAINS_CBM.out link CBM
CREATE property CBM_CONTAINS_CBM.in link CBM

CREATE CLASS RealisedCapability extends V
CREATE property RealisedCapability.CBM link CBM

CREATE CLASS F2B_USES_RealisedCapability extends E
CREATE property F2B_USES_RealisedCapability.out link FrontToBackProcess
CREATE property RealisedCapability.in link RealisedCapability